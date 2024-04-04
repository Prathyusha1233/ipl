import React, { useEffect, useState } from "react";
import "./index.css";
import NavBar from "../../Components/NavBar";
import {
  scheduleMatches,
  updateMatches,
  updateWinningMatch,
  currentScheduleMatches,
  resetMatches,
} from "../../actions/userActions";
import { connect } from "react-redux";
import { Select, Table, Tag, Skeleton, Tabs } from "antd";
import Points from "../../Components/Points";
import { ModalComp } from "../../Components/Modal";
import { useRef } from "react";

const { Column } = Table;
const { TabPane } = Tabs;

const Dashboard = React.memo(
  ({ matches, userData, dispatch, current_matches }) => {
    const [activeTab, setActiveTab] = useState("next5matches");
    useEffect(() => {
      if (Object.keys(userData).length > 0 && activeTab === "next5matches") {
        dispatch(currentScheduleMatches(userData.token));
      }
      if (Object.keys(userData).length > 0 && activeTab === "alldata") {
        dispatch(scheduleMatches(userData.token));
      }
      return () => {
        dispatch(resetMatches());
      };
    }, [dispatch, userData, activeTab]);

    const tableRef = useRef(null);

    useEffect(() => {
      const currentDate = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const rowIndex = matches.findIndex(
        (match) =>
          new Date(match.matchDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }) === currentDate
      );
      if (rowIndex !== -1) {
        const rowElement = document.querySelector(
          `[data-row-key="${matches[rowIndex].matchId}"]`
        );
        if (rowElement) {
          rowElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, [matches]);

    const matchesDisabledAndNotSelected = matches.map((match) => {
      if (match.disable && match.selectedTeam === null) {
        return { ...match, result: "LOST" };
      } else {
        return match;
      }
    });

    const currentMatchesDisabledAndNotSelected = current_matches.map(
      (match) => {
        if (match.disable && match.selectedTeam === null) {
          return { ...match, result: "LOST" };
        } else {
          return match;
        }
      }
    );
    const filteredData =
      activeTab === "next5matches"
        ? currentMatchesDisabledAndNotSelected
        : matchesDisabledAndNotSelected;

    const handleCategoryChange = (selectedTeam, matchId) => {
      const updated_matches = filteredData.map((item) =>
        item.matchId === matchId ? { ...item, selectedTeam } : item
      );
      dispatch(
        updateMatches(updated_matches, selectedTeam, matchId, activeTab)
      );
    };

    const handleChangeAdmin = (winningTeam, matchId) => {
      const updated_matches = filteredData.map((item) =>
        item.matchId === matchId ? { ...item, winningTeam } : item
      );
      dispatch(
        updateWinningMatch(updated_matches, winningTeam, matchId, activeTab)
      );
    };

    const convertTimestampToReadableDate = (timestamp) => {
      const date = new Date(timestamp);
      const formattedDate = date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "UTC",
      });
      return formattedDate;
    };

    const splitString = (record) => {
      const afteraSplit = record?.split(",").join("\n");
      return afteraSplit;
    };

    const { Option } = Select;
    const SelectTeamColumn = ({ record, onSelectTeam }) => {
      const handleSelectChange = (value) => {
        onSelectTeam(record.matchId, value);
      };

      return (
        <Select
          disabled={record.disable}
          style={{ width: 70 }}
          value={record.selectedTeam}
          onChange={handleSelectChange}>
          {record.homeTeam && (
            <Option key={record.homeTeam} value={record.homeTeam}>
              {record.homeTeam}
            </Option>
          )}
          {record.awayTeam && (
            <Option key={record.awayTeam} value={record.awayTeam}>
              {record.awayTeam}
            </Option>
          )}
        </Select>
      );
    };

    const SelectWinningTeamColumn = ({ record, onSelectTeam }) => {
      const handleSelectChange = (value) => {
        onSelectTeam(record.matchId, value);
      };

      return (
        <Select
          style={{ width: 70 }}
          value={record.winningTeam}
          onChange={handleSelectChange}>
          {record.homeTeam && (
            <Option key={record.homeTeam} value={record.homeTeam}>
              {record.homeTeam}
            </Option>
          )}
          {record.awayTeam && (
            <Option key={record.awayTeam} value={record.awayTeam}>
              {record.awayTeam}
            </Option>
          )}
        </Select>
      );
    };

    const renderTable = () => {
      return filteredData.length > 0 ? (
        <Table
          style={{ width: "100%" }}
          pagination={false}
          dataSource={filteredData}
          bordered
          rowKey="matchId"
          ref={tableRef}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "even-row" : "odd-row"
          }
          components={{
            header: {
              cell: (props) => (
                <th
                  {...props}
                  className="custom-header"
                  style={{ backgroundColor: "##88b04b", color: "black" }}
                />
              ),
            },
          }}>
          <Column
            title="Match Date"
            dataIndex="matchDate"
            key="matchDate"
            width={100}
            render={(text, record) =>
              convertTimestampToReadableDate(record.matchDate)
            }
          />
          <Column
            title="Match"
            key="match"
            width={150}
            render={(text, record) => (
              <span>
                {record.homeTeam} vs {record.awayTeam}
              </span>
            )}
          />
          <Column
            title="Select Team"
            dataIndex="selectedTeam"
            key="selectedTeam"
            width={50}
            render={(text, record) => (
              <SelectTeamColumn
                record={record}
                onSelectTeam={(key, value) => {
                  handleCategoryChange(value, key);
                }}
              />
            )}
          />
          {userData.role === "FPLAdmin" && (
            <Column
              title="Winning Team"
              dataIndex="winningTeam"
              key="winningTeam"
              width={100}
              render={(text, record) => (
                <SelectWinningTeamColumn
                  record={record}
                  onSelectTeam={(key, value) => {
                    handleChangeAdmin(value, key);
                  }}
                />
              )}
            />
          )}
          {activeTab === "alldata" && (
            <Column
              title="Stats"
              key="count"
              width={70}
              render={(text, record) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ whiteSpace: "pre-line", width: "60px" }}>
                    {splitString(record?.count)}
                  </div>
                  {record?.homeTeamUsers && record?.awayTeamUsers && (
                    <ModalComp record={record} />
                  )}
                </div>
              )}
            />
          )}
          <Column
            width={70}
            title="Result"
            dataIndex="result"
            render={(result, record) => (
              <>
                {result === "WON" && <Tag color="green">{result}</Tag>}

                {result === "LOST" && <Tag color="red">{result}</Tag>}
              </>
            )}
          />
        </Table>
      ) : (
        <Skeleton />
      );
    };
    return (
      <>
        <NavBar />
        <div className="welcome-message">Welcome {userData.name}!</div>
        <div className="dashboard-container">
          <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
            <TabPane tab="Next 5 Matches" key="next5matches">
              {activeTab === "next5matches" && current_matches && renderTable()}
            </TabPane>
            <TabPane tab="All Matches" key="alldata">
              {activeTab === "alldata" && matches && renderTable()}
            </TabPane>
            <TabPane tab="Points" key="points">
              {activeTab === "points" && <Points />}
            </TabPane>
          </Tabs>
        </div>
      </>
    );
  }
);

const mapStateToProps = (state) => {
  return {
    matches: state.matches,
    current_matches: state.current_matches,
    userData: state.user,
    errorMessage: state.message,
  };
};
export default connect(mapStateToProps)(Dashboard);

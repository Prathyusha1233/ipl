import React, { Component, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./index.css";
import NavBar from "../../Components/NavBar";
import {
  sheduleMatches,
  updateMatches,
  updateWinningMatch,
  validateUser,
} from "../../actions/userActions";
import { connect } from "react-redux";
import { Select, Table, Tag, Skeleton, Switch, Tabs } from "antd";
import Points from "../../Components/Points";
import moment from "moment";
const { Column } = Table;
const { TabPane } = Tabs;

const Dashboard = React.memo(({ matches, userData, dispatch }) => {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("next5matches");

  const filteredData =
    activeTab === "next5matches"
      ? matches &&
        matches
          .filter((item) =>
            moment(item.matchDate).isSameOrAfter(moment().startOf("day"))
          )
          .slice(0, 5)
          .sort((a, b) => a.matchDate - b.matchDate)
      : matches;

  useEffect(() => {
    if (location.state.userDetails.email) {
      dispatch(validateUser(location.state.userDetails?.email));
    }
  }, [dispatch, location.state.userDetails]);

  useEffect(() => {
    if (Object.keys(userData).length > 0 && userData.userId) {
      dispatch(sheduleMatches(userData.userId));
    }
  }, [dispatch, userData]);

  const handleCategoryChange = (selectedTeam, matchId) => {
    const updated_matches = filteredData.map((item) =>
      item.matchId === matchId ? { ...item, selectedTeam } : item
    );
    dispatch(updateMatches(updated_matches, selectedTeam, matchId));
  };

  const handleChangeAdmin = (winningTeam, matchId) => {
    const updated_matches = filteredData.map((item) =>
      item.matchId === matchId ? { ...item, winningTeam } : item
    );
    dispatch(updateWinningMatch(updated_matches, winningTeam, matchId));
  };

  const convertTimestampToReadableDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      //year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedDate;
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
        disabled={record.disable}
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

  console.log("filteredData", filteredData);
  const renderTable = () => (
    <Table
      style={{ width: "100%" }}
      pagination={false}
      dataSource={filteredData}
      bordered
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
              console.log(key, value);
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
                console.log(key, value);
                handleChangeAdmin(value, key);
              }}
            />
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
  );

  return (
    <>
      <NavBar />
      <div className="welcome-message">
        Welcome {location.state?.userDetails.family_name}!
      </div>
      <div className="dashboard-container">
        {filteredData ? (
          <>
            <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
              <TabPane tab="Next 5 Matches" key="next5matches">
                {activeTab === "next5matches" && renderTable()}
              </TabPane>
              <TabPane tab="All Matches" key="alldata">
                {activeTab === "alldata" && renderTable()}
              </TabPane>
              <TabPane tab="Points" key="points">
                {activeTab === "points" && <Points />}
              </TabPane>
            </Tabs>
          </>
        ) : (
          <Skeleton active />
        )}
      </div>
    </>
  );
});

const mapStateToProps = (state) => {
  return {
    matches: state.matches,
    userData: state.user,
    errorMessage: state.message,
  };
};
export default connect(mapStateToProps)(Dashboard);

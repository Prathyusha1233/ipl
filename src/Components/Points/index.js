import React, { useEffect } from "react";
import { getPoints, resetPoints } from "../../actions/userActions";
import { connect } from "react-redux";
import { CrownOutlined, StarOutlined } from "@ant-design/icons";
import { Table, Tag, Skeleton } from "antd";
const { Column } = Table;

const Points = ({ points, dispatch, userData }) => {
  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      dispatch(getPoints());
    }
    return () => {
      dispatch(resetPoints());
    };
  }, [dispatch,userData]);

const rankedData =
  points &&
  points
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((item, index, array) => ({
      ...item,
      rank:
        index === 0 || item.totalPoints !== array[index - 1].totalPoints
          ? index + 1
          : array[index - 1].rank,
    }));


  return (
    <div className="dashboard-container">
      {rankedData.length > 1 ? (
        <Table
          pagination={false}
          dataSource={rankedData}
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
            title="Rank"
            dataIndex="totalPoints"
            key="rank"
            width={100}
            render={(text, record) => {
              let icon, color;
              switch (record.rank) {
                case 1:
                  icon = <CrownOutlined />;
                  color = "#DAA520";
                  break;
                case 2:
                  icon = <CrownOutlined />;
                  color = "#c0c0c0";
                  break;
                case 3:
                  icon = <CrownOutlined />;
                  color = "#A77044";
                  break;
                default:
                  icon = <StarOutlined />;
                  color = "";
              }
              return (
                <span>
                  <Tag icon={icon} color={color}>
                    {record.rank}
                  </Tag>
                </span>
              );
            }}
          />
          <Column
            title="User Name"
            dataIndex="userName"
            key="userName"
            width={100}
          />
          <Column
            title="Total Points"
            dataIndex="totalPoints"
            key="totalPoints"
            width={100}
          />
        </Table>
      ) : (
        <Skeleton active />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    points: state.points,
    userData: state.user,
  };
};
export default connect(mapStateToProps)(Points);

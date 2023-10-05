import React from "react";
import styles from "./UserStatsGraphics.module.css";
import { VictoryPie, VictoryChart, VictoryBar} from "victory";

function UserStatsGraphics({ data }){
  const [graphData, setGraphData] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(function(){
    const graphData = data.map(function(item){
      return {
        x: item,
        y: Number(item.acessos)
      };     
    });

    setGraphData(graphData);

    const acessos = data
    .map(({ acessos }) => Number(acessos))
    .reduce((a, b) => a + b, 0);

    setTotal(acessos);
  }, [data]);

  return (
    <section className={"animeLeft " + styles.graph}>
      <div className={styles.total + " " + styles.graphItem}>
        <p>Acessos: {total}</p>
      </div>
      <div className="">
        <VictoryPie 
          data={graphData} 
          innerRadius={50}
          padding={{
            top: 20,
            bottom: 20,
            left: 80,
            right: 80
          }}
        />
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar alignment="start" data={graphData}/>
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraphics;
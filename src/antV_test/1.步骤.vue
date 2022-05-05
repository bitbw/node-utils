<template>
  <v-container>
    <!--步骤.1 容器 -->
    <div id="mountNode"></div>
  </v-container>
</template>

<script>
import G6 from "@antv/g6";
export default {
  name: "G6",
  async mounted() {
    /*
    ## 步骤.2 数据准备
    引入 G6 的数据源为 JSON 格式的对象。该对象中需要有节点（nodes）和边（edges）字段，分别用数组表示：
     */

    // 初始化数据
    const initData = {
      // 点集
      nodes: [
        {
          id: "node1", // 节点的唯一标识
          x: 100, // 节点横坐标
          y: 200, // 节点纵坐标
          label: "起始点", // 节点文本
        },
        {
          id: "node2",
          x: 300,
          y: 200,
          label: "目标点",
        },
      ],
      // 边集
      edges: [
        // 表示一条从 node1 节点连接到 node2 节点的边
        {
          source: "node1", // 起始点 id
          target: "node2", // 目标点 id
          label: "我是连线", // 边的文本
        },
      ],
    };
    /*
    ## 步骤.3 图实例化
    图实例化时，至少需要为图设置容器、宽、高：
     */
    const graph = new G6.Graph({
      container: "mountNode", // 指定挂载容器
      width: 800, // 图的宽度
      height: 500, // 图的高度
    });
    /*
    ## 步骤.4 图的渲染
    数据的加载和图的渲染是两个步骤，可以分开进行。
     */

    graph.data(initData); // 加载数据

    graph.render(); // 渲染 调用 graph.render() 方法之后，G6 引擎会根据加载的数据进行图的绘制。
  },
};
</script>

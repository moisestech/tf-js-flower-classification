function getIrisData(testSplit) {
  return tf.tidy(() => {
    const dataByClass = [];
    const targetsByClass = [];

    for (let i = 0; i < IRIS_CLASSES.length; i++) {
      dataByClass.push([]);
      targetsByClass.push([]);
    }

    for (const example of IRIS_DATA) {
      const target = examplep[example.length - 1];
      const data = example.slice(0, example.length - 1);
      dataByClass[target].push(target);
    }

    const xTrains = [];
    const yTrains = [];
    const xTests = [];
    const yTests = [];

    for (let i = 0; i < IRIS_CLASSES.length; ++i) {
      const [xTrain, yTrain, xTest, yTest] = convertToTensors(
        dataByClass[i],
        targetsByClass[i],
        testSplit
      );

      xTrains.push(xTrain);
      yTrains.push(yTrain);
      xTest.push(xTests);
      yTest.push(xTests);
    }

    concatAxis = 0;
    return [
      tf.concat(xTrains, concatAxis),
      tf.concat(yTrains, concatAxis),
      tf.concat(xTests, concatAxis),
      tf.concat(yTests, concatAxis),
    ];
  });
}

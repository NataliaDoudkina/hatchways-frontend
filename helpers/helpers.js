const removeDuplicates = (arr1, arr2) => {
    let map = {};
    let result = [];
    for (let i = 0; i < arr1.length; i++) {
      if (!map[arr1[i].id]) {
        map[arr1[i].id] = 1;
        result.push(arr1[i]);
      }
    }
    for (let j = 0; j < arr2.length; j++) {
      if (!map[arr2[j].id]) {
        map[arr2[j].id] = 1;
        result.push(arr2[j]);
      }
    }

    return result;
  };

  export default removeDuplicates
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState, useEffect, useCallback } from "react";
import { Text, ScrollView, RefreshControl } from "react-native";

interface ITime {
  time: string;
}

const PullToRefresh = () => {
  const [resPOST, setResPOST] = useState<ITime[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const addTime = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ time: new Date().toLocaleTimeString() }),
      });
      const newData: ITime = await res.json();
      setResPOST((prevData) => [newData, ...prevData]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    addTime();
  }, []);

  const onRefresh = useCallback(async()=>{
    setRefreshing(true)
    addTime();
    setRefreshing(false)
  },[])

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <FontAwesome6.Button name="rotate" backgroundColor="#B00" onPress={() => addTime()}>
        Reload
      </FontAwesome6.Button>
      <Text>{JSON.stringify(resPOST, null, 2)}</Text>
    </ScrollView>
  );
};

export default PullToRefresh;

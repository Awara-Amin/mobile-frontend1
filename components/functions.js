// import NetInfo from "@react-native-community/netinfo";
// import { useNetInfo } from "@react-native-community/netinfo";
import React, { useContext, useEffect, useState } from "react";

// const checkConnected = () => {
//   return NetInfo.fetch().then((state) => {
//     console.log("aaaaaaaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAAAAA");
//     console.log("Connection type kaka1...", state.type);
//     console.log("Is connected kaka2.....?", state.isConnected);
//     return state.isConnected;
//   });
// };

// export default checkConnected;
const useInternetStatus = () => {
  // I make a name to your hook is best in inspection and testing
  const [isInternetReachable, setIsInternetReachable] = useState(false);
  const InternetChecker = () => {
    useEffect(() => {
      // Subscribe
      const unsubscribe = NetInfo.addEventListener((state) => {
        setIsInternetReachable(state.isInternetReachable);
        // console.log("Connection type", state.type);
        // console.log("Is internet Reachable?", isInternetReachable);
      });
      return () => {
        unsubscribe();
      };
    }, [isInternetReachable]); // in order to re-call the hooks whenever the netInfo status changed
  };

  return [InternetChecker, isInternetReachable];
};

export default useInternetStatus;

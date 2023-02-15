// const Button = ({ children, ...props }) => (
//   <TouchableOpacity style={styles.button} {...props}>
//     <Text style={styles.buttonText}>{children}</Text>
//   </TouchableOpacity>
// );

// const NoInternetModal = ({ show, onRetry, isRetrying }) => (
//   <Modal isVisible={show} style={styles.modal} animationInTiming={600}>
//     <View style={styles.modalContainer}>
//       <Text style={styles.modalTitle}>Connection Error</Text>
//       <Text style={styles.modalText}>
//         Oops! Looks like your device is not connected to the Internet.
//       </Text>
//       <Button onPress={onRetry} disabled={isRetrying}>
//         Try Again
//       </Button>
//     </View>
//   </Modal>
// );

// const fetchUsers = useCallback(() => {
//   setLoading(true);

//   axios
//     .get("https://randomuser.me/api/?results=30")
//     .then(({ data }) => {
//       const { results } = data;
//       setUsers(results);
//       isOffline && setOfflineStatus(false);
//     })
//     .finally(() => {
//       setLoading(false);
//     });
// }, [isOffline]);

// // inside <Users /> component
// <NoInternetModal
//   show={isOffline}
//   onRetry={fetchUsers}
//   isRetrying={isLoading}
// />;

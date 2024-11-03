// components/Pagination.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <View style={styles.container}>
      {/* Previous Button */}
      <TouchableOpacity
        style={[styles.button, currentPage === 1 && styles.disabledButton]}
        onPress={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Text
          style={[styles.buttonText, currentPage === 1 && styles.disabledText]}
        >
          Previous
        </Text>
      </TouchableOpacity>

      {/* Page Indicator */}
      <View style={styles.pageIndicator}>
        <Text style={styles.pageText}>
          Page {currentPage} of {totalPages}
        </Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={[
          styles.button,
          currentPage === totalPages && styles.disabledButton,
        ]}
        onPress={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        <Text
          style={[
            styles.buttonText,
            currentPage === totalPages && styles.disabledText,
          ]}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#333", // Background for the pagination container
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#666", // Dimmed color for disabled state
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  disabledText: {
    color: "#bbb",
  },
  pageIndicator: {
    backgroundColor: "#444",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  pageText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

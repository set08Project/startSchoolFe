import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%", // Two cards per row
    height: 220,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "#0f172a", // Match the modal's dark blue
    color: "#ffffff",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1e3a8a",
  },
  header: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  schoolInfo: {
    flexDirection: "column",
  },
  schoolName: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  idTag: {
    fontSize: 8,
    color: "#bfdbfe",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  body: {
    padding: 10,
    flexDirection: "row",
    gap: 10,
  },
  avatar: {
    width: 60,
    height: 70,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  infoSection: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 2,
  },
  className: {
    fontSize: 9,
    color: "#bfdbfe",
    marginBottom: 5,
  },
  enrollmentLabel: {
    fontSize: 7,
    color: "#93c5fd",
    textTransform: "uppercase",
  },
  enrollmentID: {
    fontSize: 11,
    color: "#fcd34d",
    fontWeight: "bold",
  },
  qrSection: {
    alignItems: "center",
    marginTop: 5,
    paddingBottom: 10,
  },
  qrCode: {
    width: 80,
    height: 80,
    backgroundColor: "#ffffff",
    padding: 5,
    borderRadius: 10,
  },
  footer: {
    padding: 5,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  sessionInfo: {
    fontSize: 7,
    color: "#93c5fd",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

interface Student {
  _id: string;
  studentFirstName: string;
  studentLastName: string;
  classAssigned: string;
  enrollmentID: string;
  avatar?: string;
  schoolName?: string;
  schoolIDs?: string;
}

interface Props {
  students: Student[];
  qrCodes: { [key: string]: string }; // Map of student ID to QR data URL
}

const StudentIDCardPDF = ({ students, qrCodes }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.cardContainer}>
        {students.map((student) => (
          <View key={student._id} style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.schoolInfo}>
                <Text style={styles.schoolName}>
                  {student.schoolName || student.schoolIDs || "SCHOOL"}
                </Text>
                <Text style={styles.idTag}>STUDENT ID CARD</Text>
              </View>
            </View>

            {/* Body */}
            <View style={styles.body}>
              <Image
                style={styles.avatar}
                src={student.avatar || "https://res.cloudinary.com/dpf7vtoey/image/upload/v1711200000/pix_jtshjg.jpg"}
              />
              <View style={styles.infoSection}>
                <Text style={styles.name}>
                  {student.studentFirstName} {student.studentLastName}
                </Text>
                <Text style={styles.className}>
                  {student.classAssigned || "Student"}
                </Text>
                <View>
                  <Text style={styles.enrollmentLabel}>Enrollment ID</Text>
                  <Text style={styles.enrollmentID}>{student.enrollmentID}</Text>
                </View>
              </View>
            </View>

            {/* QR Section */}
            <View style={styles.qrSection}>
              {qrCodes[student._id] ? (
                <Image style={styles.qrCode} src={qrCodes[student._id]} />
              ) : (
                <View style={[styles.qrCode, { backgroundColor: "#eee" }]} />
              )}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.sessionInfo}>Academic Session</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default StudentIDCardPDF;

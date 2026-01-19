"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/stats")
      .then((res) => res.json())
      .then((incomingData) => {
        // Agar backend se error aya (dictionary format)
        if (incomingData.error) {
          setError(incomingData.error);
        } else {
          // Agar sahi list aayi
          setData(incomingData);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Backend se connect nahi ho pa raha.");
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>
        🏨 Hotel Bookings Data (Top 50 Rows)
      </h1>

      {loading ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>
          ⏳ Loading Data...
        </p>
      ) : error ? (
        <div
          style={{
            color: "red",
            textAlign: "center",
            border: "1px solid red",
            padding: "10px",
            background: "#ffe6e6",
          }}
        >
          <h3>⚠️ Error:</h3>
          <p>{error}</p>
        </div>
      ) : (
        // --- TABLE DISPLAY ---
        <div
          style={{
            overflowX: "auto",
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "600px",
            }}
          >
            {/* Table Header (Automatic Columns) */}
            <thead>
              <tr
                style={{
                  backgroundColor: "#0070f3",
                  color: "white",
                  textAlign: "left",
                }}
              >
                {data.length > 0 &&
                  Object.keys(data[0]).map((key) => (
                    <th
                      key={key}
                      style={{
                        padding: "12px",
                        borderBottom: "2px solid #ddd",
                      }}
                    >
                      {key.replace(/_/g, " ").toUpperCase()}
                    </th>
                  ))}
              </tr>
            </thead>

            {/* Table Body (Rows) */}
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  style={{
                    borderBottom: "1px solid #ddd",
                    backgroundColor: rowIndex % 2 === 0 ? "#f9f9f9" : "white",
                  }}
                >
                  {Object.values(row).map((val, colIndex) => (
                    <td
                      key={colIndex}
                      style={{ padding: "10px", color: "#333" }}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
// done

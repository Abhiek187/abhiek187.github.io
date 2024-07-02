import { MetricType } from "web-vitals";

const reportWebVitals = (onPerfEntry?: (metric: MetricType) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    void import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry); // Cumulative Layout Shift
      onINP(onPerfEntry); // Interaction to Next Paint
      onFCP(onPerfEntry); // First Contentful Paint
      onLCP(onPerfEntry); // Largest Contentful Paint
      onTTFB(onPerfEntry); // Time to First Byte
    });
  }
};

export default reportWebVitals;

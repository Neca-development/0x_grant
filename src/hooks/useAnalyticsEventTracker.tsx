import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category="event") => {
  const eventTracker = (action = "action", label = "label") => {
    ReactGA.event({category, action, label});
  }
  return eventTracker;
}
export default useAnalyticsEventTracker;
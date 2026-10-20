import { Block, PageHeader } from "../components/Placeholder";

const today = new Date().toLocaleDateString("en-AU", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export default function TodayPage() {
  return (
    <>
      <PageHeader title="Today" subtitle={today} />
      <div className="grid">
        <Block title="Focus for today">Your top few things for the day go here.</Block>
        <Block title="Follow-ups due">Follow-ups due today or overdue go here.</Block>
        <Block title="To triage">New inbox items waiting for a decision go here.</Block>
        <Block title="Initiatives in motion">What is in progress or blocked in your domains goes here.</Block>
      </div>
    </>
  );
}

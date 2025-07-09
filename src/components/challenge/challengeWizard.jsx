import React, { useState } from "react";
import ChallengeConfigPage from "./challengeConfigPage";
import CategoryPage from './categoryPage';
import DayPlannerPage from './dayPlannerPage';
import DailyPlanningPage from './firstDayPage';
import { useNavigate } from "react-router-dom";

export default function ChallengeWizard({ show, onSubmit }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [challengeData, setChallengeData] = useState({});
  const [dayOneData, setDayOneData] = useState([]); // ✅ Save allocations here

  if (!show) return null;

  const handleDataChange = (newData) => {
    setChallengeData(prev => ({ ...prev, ...newData }));
  };

  const goNext = () => setStep(s => s + 1);
  const goBack = () => setStep(s => Math.max(1, s - 1));

  const handleDayPlannerSubmit = (allocations) => {
    setDayOneData(allocations); // ✅ Save Day 1 allocations
    goNext();
  };

  const handleChallengeStart = () => {
    const fullData = { ...challengeData, dayOnePlan: dayOneData };
    onSubmit(fullData); // ✅ Send full challenge setup data
    fetch('/challenge', )
    navigate("/");
  };

  return (
    <>
      {step === 1 && (
        <ChallengeConfigPage
          data={challengeData}
          onChange={handleDataChange}
          onNext={goNext}
        />
      )}
      {step === 2 && (
        <CategoryPage
          data={challengeData}
          onChange={handleDataChange}
          onBack={goBack}
          onNext={goNext}
        />
      )}
      {step === 3 && (
        <DayPlannerPage
          data={challengeData}
          onBack={goBack}
          onSubmit={handleDayPlannerSubmit} // ✅ Use this instead of handleFinish
        />
      )}
      {step === 4 && (
        <DailyPlanningPage
          dayNumber={1}
          startDate={challengeData.startDate}
          categoryGoals={challengeData.categories || []}
          previousProgress={{}} // empty for day 1
          avgHoursPerDay={challengeData.avgHoursPerDay || 0}
          onSubmit={(todayAllocations) => {
            setDayOneData(todayAllocations);
            handleChallengeStart();
          }}
        />
      )}
    </>
  );
}

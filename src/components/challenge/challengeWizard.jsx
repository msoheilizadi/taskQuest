import ChallengeConfigPage from "./challengeConfigPage";
import CategoryPage from './categoryPage';
import DayPlannerPage from './dayPlannerPage';
import react, { useState } from "react";

export default function ChallengeWizard({ show, onClose, onSubmit }) {
  const [step, setStep] = useState(1);
  const [challengeData, setChallengeData] = useState({});

  if (!show) return null; // don't render if show is false

  const handleDataChange = (newData) => {
    setChallengeData(prev => ({ ...prev, ...newData }));
  };

  const goNext = () => setStep(s => s + 1);
  const goBack = () => setStep(s => Math.max(1, s - 1));

  const handleFinish = (finalData) => {
    const fullData = { ...challengeData, ...finalData };
    onSubmit(fullData);
    onClose();
  };

  return (
    <>
      {step === 1 && (
        <ChallengeConfigPage data={challengeData} onChange={handleDataChange} onNext={goNext} />
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
          onSubmit={handleFinish}
        />
      )}
    </>
  );
}

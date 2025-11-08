"use client";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./checkoutSteps.module.css";

export default function CheckoutSteps({ currentStep }: { currentStep: number }) {
  const steps = [
    { id: 1, label: "مجموعة اختياراتك" },
    { id: 2, label: "بياناتك" },
    { id: 3, label: "إنهاء الحجز" },
  ];

  return (
    <div className={`${styles.container} container`}>
      <ol className={styles.checkoutSteps}>
        {steps.map((step) => (
            <>
          <li
            key={step.id}
            className={`flex gap-2 justify-center items-center transition-all ${
              currentStep === step.id ? `text-[#f0b100] font-semibold ${styles.active} ` : currentStep > step.id? "text-[#f0b100]": "text-gray-500"
            }`}
          >
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                currentStep > step.id
                  ? "border-[#f0b100]"
                  : currentStep === step.id
                  ? "border-[#f0b100] bg-white"
                  : "border-gray-500"
              }`}
            >
              {currentStep > step.id ? (
                <FaCheckCircle className="text-[#f0b100] w-full h-full" />
              ) : (
                <span>{step.id}</span>
              )}
            </div>
            <strong className="text-sm">{step.label}</strong>
          </li>
          <span></span>
         </>
        ))}
      </ol>
    </div>
  );
}

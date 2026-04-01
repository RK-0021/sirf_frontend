import React from "react";

const PasswordStrengthIndicator = ({
  validity: { minChar, upperCase, specialChar },
}) => {
  return (
    <div className="password-meter text-left mb-4" style={{fontSize:12}}>
      {/* <p className="text-dark"> Password must contain:</p> */}
      <ul className="text-muted">
        <PasswordStrengthIndicatorItem
          isValid={minChar}
          text="Have at least 8 characters."
        />
        <PasswordStrengthIndicatorItem
          isValid={upperCase}
          text="Have at least 1 uppercase character."
        />

        <PasswordStrengthIndicatorItem
          isValid={specialChar}
          text="Have at least 1 special character"
        />
      </ul>
    </div>
  );
};

const PasswordStrengthIndicatorItem = ({ isValid, text }) => {
  const highlightClass = isValid
    ? "text-success"
    : isValid != null
    ? "text-danger"
    : "";
  return <li className={highlightClass}>{text}</li>;
};

export default PasswordStrengthIndicator;

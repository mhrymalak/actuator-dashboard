import React from "react";
import ButtonOption from "../Components/ButtonOption.js";

const Options = ({ active, updateAppData, env, setActive, isLoading }) => {
  const onClick = () => {
    updateAppData(env);
    setActive();
  };

  return (
    <div data-testid="options"
      className={active ? "menu-env-active" : "menu-env"}
      onClick={() => onClick()}
    >
      <ButtonOption 
        active={active}
        isLoading={isLoading}
        buttonType="EnvButton"
        value={env.toUpperCase()}
        onClick={onClick}
      />
    </div>
  );
};

export default Options;

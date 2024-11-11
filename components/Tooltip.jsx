/* eslint-disable react/prop-types */

const Tooltip = ({ tipData }) => {
  if (!tipData) {
    return null;
  }

  return (
    <div
      className={'tooltip'}
      style={{
        left: tipData.xPos,
        top: tipData.yPos,
      }}
    >
      {tipData.teams}
    </div>
  );
};

export default Tooltip;
const LadderGameSelect = (count) => {
  const buttons = [];
  for (let i = 0; i < count; i++) {
    buttons.push({ id: i, value: 0 });
  }
  return (
    <div>
      {buttons.map((id, value) => {
        <input key={id} value={value} />;
      })}
    </div>
  );
};

export default LadderGameSelect;

import { useState, useCallback } from "react";
import "./Count.scss";

const LadderGameCount = ({ editCount }) => {
  const [value, setValue] = useState(2);
  const onChange = useCallback((e) => {
    const newValue = e.target.value;
    // 입력된 값이 숫자로 변환 가능한지 또는 빈 문자열인지 확인
    const intValue = parseInt(newValue, 10);
    if (!isNaN(intValue) || newValue === "") {
      // 숫자로 변환 가능하거나 빈 문자열인 경우에만 값 업데이트
      setValue(newValue === "" ? "" : intValue);
    }
  });

  const onSubmit = useCallback(
    (e) => {
      editCount(value);
      e.preventDefault();
    },
    [value, editCount]
  );

  return (
    <form className="Form" onSubmit={onSubmit}>
      <input
        className="Input"
        placeholder="갯수 입력"
        value={value}
        onChange={onChange}
      />
    </form>
  );
};

export default LadderGameCount;

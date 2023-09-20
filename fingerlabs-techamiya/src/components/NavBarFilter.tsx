import { useState } from "react";
import { styled } from "styled-components";

const NavBarFilter = ({ filterIdx }: { filterIdx: number }) => {
  const FILTER = [
    ["가", "나", "다"],
    ["...", ".....", "........"],
    ["망", "망망", "망망망"],
  ];
  const [isChecked, setChecked] = useState<boolean[]>(
    Array.from({ length: FILTER[filterIdx].length }, () => false)
  );

  return (
    <St.Wrapper>
      {FILTER[filterIdx].map((el, idx) => (
        <St.TraitItem key={idx}>
          <St.CheckBox
            $isItemChecked={isChecked[idx]}
            onClick={() => {
              const temp = [...isChecked];
              temp[idx] = !temp[idx];
              setChecked(temp);
            }}
          >
            ✓
          </St.CheckBox>
          <span>{el}</span>
        </St.TraitItem>
      ))}
    </St.Wrapper>
  );
};

export default NavBarFilter;

const St = {
  Wrapper: styled.ul``,
  TraitItem: styled.li`
    display: flex;

    & > span {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.purple1};
    }
  `,
  CheckBox: styled.div<{ $isItemChecked: boolean }>`
    text-align: center;

    margin-right: 1.5rem;
    width: 1.8rem;
    height: 1.8rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.purple1};
    border-radius: 0.3rem;
    background-color: ${({ $isItemChecked, theme }) =>
      $isItemChecked ? theme.colors.purple1 : theme.colors.bg};

    font-size: 1.3rem;
    color: ${({ $isItemChecked, theme }) =>
      $isItemChecked ? "white" : theme.colors.bg};
    cursor: pointer;
  `,
};

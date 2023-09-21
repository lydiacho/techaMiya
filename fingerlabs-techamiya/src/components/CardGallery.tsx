import { styled } from "styled-components";
import Card from "./Card";
import useGetMiya from "../hooks/useGetMiya";
import { useInView } from "react-intersection-observer";

const CardGallery = ({ checkedList }: { checkedList: string[][] }) => {
  const [ref, inView] = useInView();
  const DATA = useGetMiya(inView);

  return (
    <St.Wrapper>
      {checkedList &&
        DATA.filter((miya) => {
          // 모든 필터를 순회하면서
          let flag = true;
          checkedList.forEach((filter, filterIdx) => {
            // 하나라도 false면 flag도 false
            flag =
              flag &&
              // 체크를 아무것도 안했을 때도 포함
              (filter.includes(miya.attributes[filterIdx].value) ||
                filter.length === 0);
          });
          return flag;
        }).map((el, idx) => <Card key={idx} name={el.name} image={el.image} />)}
      <div ref={ref} />
    </St.Wrapper>
  );
};

export default CardGallery;

const St = {
  Wrapper: styled.main`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;

    width: 93rem;
  `,
};

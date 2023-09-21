import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { provider, techaMiyaABI, techaMiyaContractAddress } from "../lib/api";
import { MetaDataType } from "../types/NftType";

const useGetMiya = () => {
  const [data, setData] = useState<MetaDataType[]>([]);
  const miya = new ethers.Contract(
    techaMiyaContractAddress,
    techaMiyaABI,
    provider
  );

  // 너무 느림. 최적화 필요 -> 데이터 순서대로 불러오는것을 포기하고 반복문으로 가져오기 (속도 훨씬 개선)
  useEffect(() => {
    setData([]);
    for (let i = 0; i < 1000; i++) {
      miya
        .tokenURI(i)
        .then(fetch)
        .then((res) => res.json())
        .then((json) => JSON.stringify(json, null, 2))
        .then((json) => JSON.parse(json))
        .then((res) => {
          setData((prev) => [...prev, res]);
        });
    }
  }, []);

  return data;
};

export default useGetMiya;

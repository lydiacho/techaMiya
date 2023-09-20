import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { provider, techaMiyaABI, techaMiyaContractAddress } from "../lib/api";
import { MetaDataType } from "../types/NftType";

const useGetMiya = (start: number) => {
  const [data, setData] = useState<MetaDataType[]>([]);
  const miya = new ethers.Contract(
    techaMiyaContractAddress,
    techaMiyaABI,
    provider
  );

  useEffect(() => {
    // 무한스크롤을 위해 start 추가
    if (data.length < 9) {
      miya
        .tokenURI(data.length + start)
        .then(fetch)
        .then((res) => res.json())
        .then((json) => JSON.stringify(json, null, 2))
        .then((json) => JSON.parse(json))
        .then((res) => {
          setData((prev) => [...prev, res]);
        });
    }
  }, [data]);

  return data;
};

export default useGetMiya;

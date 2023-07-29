import TextareaAutosize from "react-textarea-autosize";
import styles from "../styles/SummarySection.module.scss";
import { KTON_CONTEXT } from "../context/KTONContext";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import HandleLoginModal from "./HandleLoginModal";
import userAuthenticated from "@/helpers/UserAuthenticated";
import HandleChanges from "@/helpers/HandleChanges";
//Random Change

const SummarySection = () => {
  const router = useRouter();
  const id = router.query.id;
  const { books } = useContext(KTON_CONTEXT);
  const [inputSummary, setInputSummary] = useState<string | undefined>(
    books?.filter((book) => book._id === id)[0].summary
  );
  const [restrictions, setRestricitons] = useState<boolean>(true);
  const { addSummaryToBook } = HandleChanges();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // Perform any action you want to execute when Enter is pressed
      addSummaryToBook({ data: inputSummary, book_id: id });
    }
  };

  useEffect(() => {
    setRestricitons(!userAuthenticated());
  }, []);

  return (
    <div className={styles.summarySection}>
      <TextareaAutosize
        value={inputSummary}
        placeholder="Add a quick summary here"
        onChange={(e) => setInputSummary(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.buttonsSection}>
        <p
          onClick={() => {
            addSummaryToBook({ data: inputSummary, book_id: id });
          }}
        >
          Save
        </p>
        <p onClick={() => setInputSummary("")}>Clear</p>
      </div>
    </div>
  );
};

export default SummarySection;

import { Dispatch, SetStateAction } from "react";

type TEllipsisProps = {
  setMenuVisible: Dispatch<SetStateAction<boolean>>;
  className: string;
};

export const Ellipsis = ({ setMenuVisible, className }: TEllipsisProps) => {
  return (
    <>
      <p
        className={className}
        onClick={(e) => {
          e.stopPropagation();
          setMenuVisible(true);
        }}
        onBlur={() => setMenuVisible(false)}
      >
        &#8942;
      </p>
    </>
  );
};

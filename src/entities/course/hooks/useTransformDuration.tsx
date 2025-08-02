import { useMemo } from "react";

import { Plural } from "@lingui/react/macro";

export const useTransformDuration = (duration: number) => {
  const transformedDuration = useMemo(() => {
    const hours = Math.round(duration / 60);
    if (hours < 24) {
      return (
        <Plural value={hours} one="# hour" few="# hours" other="# hours" />
      );
    }

    const days = Math.round(hours / 24);
    if (days < 7) {
      return <Plural value={days} one="# day" few="# days" other="# days" />;
    }

    const weeks = duration / 60 / 24 / 7;
    if (weeks < 4.3) {
      return (
        <Plural
          value={Math.round(weeks)}
          one="# week"
          few="# weeks"
          other="# weeks"
        />
      );
    }

    const monthes = Math.round(weeks / 4.3);
    if (monthes < 12) {
      return (
        <Plural
          value={monthes}
          one="# month"
          few="# monthes"
          other="# monthes"
        />
      );
    }

    const years = Math.trunc(monthes / 12);
    const monthesRemainder = monthes % 12;
    return (
      <div>
        <Plural value={years} one="# year" few="# years" other="# years" />

        {!!monthesRemainder && (
          <>
            {" "}
            <Plural
              value={monthesRemainder}
              one="# month"
              few="# monthes"
              other="# monthes"
            />
          </>
        )}
      </div>
    );
  }, [duration]);

  return transformedDuration;
};

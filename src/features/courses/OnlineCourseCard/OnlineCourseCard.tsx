import { type RefObject, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Trans } from "@lingui/react/macro";

import { useTransformDuration, type ICourse } from "@entities/course";
import { routes } from "@app/router/routes";
import { useProvidersStore } from "@entities/provider/store/provider";
// import { selectSavedCourse, useSavedCoursesStore } from "@entities/savedCourse";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";

import ClockIcon from "@shared/assets/icons/clock.svg?react";
import BookmarkIcon from "./assets/icons/bookmark.svg?react";

import s from "./OnlineCourseCard.module.scss";

import RadioInput from '../../../shared/ui/RadioInput/RadioInput';
import Datepicker from "@shared/ui/Datepicker/Datepicker";
import InputFile from "@shared/ui/InputFile/InputFile";

import { Bounce, toast as notify } from 'react-toastify'
import { SuccessNotification } from "@widgets/notifications/SuccessNotification";
import Success from "@widgets/notifications/SuccessNotification/assets/Success";

interface OnlineCourseCardProps {
  course: ICourse;
  onSaveClick?: (data: {
    anchorRef: RefObject<HTMLButtonElement | null>;
    courseId: string;
  }) => void;
}

export default function OnlineCourseCard({
  course: {
    card_logo,
    name,
    provider: providerUuid,
    has_certificate,
    duration,
    uuid,
  },
  onSaveClick,
}: OnlineCourseCardProps) {
  const providers = useProvidersStore((state) => state.providers);
  const provider = providers.find((provider) => provider.uuid === providerUuid);

  const transformedDuration = useTransformDuration(duration);


  // const savedCourse = useSavedCoursesStore(selectSavedCourse(uuid));

  const [openPopover, setOpenPopover] = useState(false)
  const saveBtnRef = useRef<HTMLButtonElement>(null);
  const [saveType, setSaveType] = useState<null | string>(null)

  const [dateValue, setDateValue] = useState<string>('')

  function saveHandle() {
    setOpenPopover(false)
    onSaveClick?.({ anchorRef: saveBtnRef, courseId: uuid })

    notify(SuccessNotification({
      text: `Course succesfully added in ${saveType}!`,
      Icon: Success
    }), {
      position: "bottom-center",
      autoClose: 5000,
      closeButton: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      icon: false,
      style: {
        background: "#4DB930",
        color: "#fff",
        padding: "0",
        minHeight: 'auto'
      },
    });
  }

  return (
    <article className={s.card}>
      <header className={s.header}>
        <img src={card_logo} alt={name} />
      </header>

      <div className={s.providerRow}>
        <img src={provider?.logo} alt={provider?.name} />
      </div>

      <h5 className={s.title}>{name}</h5>

      <footer className={s.footer}>
        <div>
          {has_certificate && (
            <span className={s.certificate}>
              <Trans>Certificate</Trans>
            </span>
          )}
          {has_certificate && !!duration && "|"}
          {!!duration && (
            <span className={s.duration}>
              <ClockIcon /> {transformedDuration}
            </span>
          )}
        </div>

        <Popover placement="right" isOpen={openPopover} >
          <PopoverTrigger>
            <Button
              className={s.saveBtn}
              onClick={() => {
                setOpenPopover(true)
                setSaveType(null)
              }
              }
            >
              <BookmarkIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className={s.popover}>
              <div className={s.popoverTitle}>Save as</div>
              <div className={s.popoverList}>
                <div>
                  <RadioInput onChange={() => setSaveType('favorites')} className={s.popoverRadio} type="radio" name="where" label="Favorites" />
                </div>

                <div>
                  <RadioInput onChange={() => setSaveType('saved')} className={s.popoverRadio} type="radio" name="where" label="Saved" />
                </div>

                <div className={s.popoverRow}>
                  <RadioInput onChange={() => setSaveType('started')} className={s.popoverRadio} type="radio" name="where" label="Started" />
                  {saveType === 'started' && <Datepicker value={dateValue} onChange={(v) => setDateValue(v)} label="My review" />}
                </div>

                <div className={s.popoverRow}>
                  <RadioInput onChange={() => setSaveType('finish')} className={s.popoverRadio} type="radio" name="where" label="Finish" />
                  {saveType === 'finish' && <InputFile label="Attach a certificate" subLabel="optional" />}
                </div>

                <div className={s.buttons}>
                  <button
                    className={s.popoverDelete} onClick={() => {
                      setOpenPopover(false)
                    }
                    } >Delete</button>
                  <button
                    ref={saveBtnRef}
                    className={s.popoverSave} onClick={saveHandle} disabled={!saveType}>Save</button>
                </div>

              </div>

            </div >
          </PopoverContent >
        </Popover >

      </footer >

      <Link to={`${routes.COURSE}/${uuid}`} className={s.link} />
    </article >
  );
}

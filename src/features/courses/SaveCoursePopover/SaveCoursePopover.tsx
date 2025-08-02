import { RefObject } from "react";
import clsx from "clsx";
import { Trans, useLingui } from "@lingui/react/macro";
import { useForm } from "react-hook-form";
import { registerLocale } from "react-datepicker";
import { enUS, uk } from "date-fns/locale";

import RadioInput from "@shared/ui/RadioInput/RadioInput";
import {
  SAVED_COURSE_TYPES,
  type SavedCourseType,
} from "@entities/savedCourse";
// import FileInput from "@shared/ui/FileInput/FileInput";
// import DatePicker from "@shared/ui/DatePicker/DatePicker";
import { Inputs } from "./types/Inputs";
import { LOCALES } from "@entities/translations";
import { useActions, useDefaultValues, useUnregisterFields } from "./hooks";
import Menu from "@shared/ui/Menu/Menu";

import s from "./SaveCoursePopover.module.scss";

registerLocale(LOCALES.EN, enUS);
registerLocale(LOCALES.UK, uk);

interface SaveCoursePopoverProps {
  courseId: string;
  onClose: () => void;
  saveId?: number;
  anchorElRef: RefObject<HTMLElement | null>;
}

export default function SaveCoursePopover({
  saveId,
  courseId,
  onClose,
  anchorElRef,
}: SaveCoursePopoverProps) {
  const { defaultSaveType } = useDefaultValues(saveId);

  const {
    register,
    watch,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { save_type: defaultSaveType },
  });
  const saveType = watch("save_type") as SavedCourseType;

  const { t } = useLingui();

  const { onSave, onDelete, error, submitting } = useActions(
    courseId,
    onClose,
    saveId
  );

  useUnregisterFields(saveType, unregister);

  return (
    <Menu
      open
      anchorElRef={anchorElRef}
      onClose={onClose}
      className={s.savePopover}
      position="top"
    >
      <h3 className={s.savePopoverTitle}>
        <Trans>Save as</Trans>
      </h3>

      <form
        onSubmit={handleSubmit(onSave)}
        className={s.savePopoverRadioInputs}
      >
        <div className={s.radioInputWrapper}>
          <RadioInput
            label={t`Favorite`}
            value={SAVED_COURSE_TYPES.FAVORITE}
            {...register("save_type")}
          />
        </div>

        <div className={s.radioInputWrapper}>
          <RadioInput
            label={t`Started`}
            {...register("save_type")}
            value={SAVED_COURSE_TYPES.STARTED}
          />

          {saveType === SAVED_COURSE_TYPES.STARTED && (
            <div className={s.subInputs}>
              {/* <Controller
                name="started_at"
                control={control}
                rules={{ required: t`This field is required` }}
                defaultValue={defaultStartedAt}
                render={({ field }) => (
                  <DatePicker
                    label={t`Start date`}
                    selected={field.value}
                    onChange={field.onChange}
                    fullWidth
                    inputProps={{
                      ref: field.ref,
                      onBlur: field.onBlur,
                    }}
                    locale={locale}
                  />
                )}
              /> */}

              {errors.started_at && (
                <p className={s.validationError}>{errors.started_at.message}</p>
              )}
            </div>
          )}
        </div>

        <div className={s.radioInputWrapper}>
          <RadioInput
            label={t`Finished`}
            {...register("save_type")}
            value={SAVED_COURSE_TYPES.FINISHED}
          />
          {saveType === SAVED_COURSE_TYPES.FINISHED && (
            <div className={clsx(s.subInputs, s.finishedSubInputs)}>
              <div className={s.datePickerWrapper}>
                {/* <Controller
                  name="finished_at"
                  control={control}
                  rules={{ required: t`This field is required` }}
                  defaultValue={defaultFinishedAt}
                  render={({ field }) => (
                    <DatePicker
                      label={t`Finish date`}
                      selected={field.value}
                      onChange={field.onChange}
                      fullWidth
                      inputProps={{
                        ref: field.ref,
                        onBlur: field.onBlur,
                      }}
                      locale={locale}
                    />
                  )}
                /> */}
              </div>
              {errors.finished_at && (
                <p className={s.validationError}>
                  {errors.finished_at.message}
                </p>
              )}

              {/* <FileInput
                label={
                  <Trans>
                    Attach certificate{" "}
                    <span className={s.optionalMark}>(Optional)</span>
                  </Trans>
                }
                {...register("certificate")}
                accept="image/jpeg, image/png, image/webp, application/pdf"
                wrapperClassName={s.fileInput}
              /> */}
              <p className={s.helperText}>
                <Trans>
                  Supported formats:{" "}
                  <span className={s.supportedFormats}>
                    jpg, jpeg, png, webp, pdf
                  </span>
                </Trans>
              </p>
            </div>
          )}
        </div>

        <div className={s.radioInputWrapper}>
          <RadioInput
            label={t`Planned`}
            {...register("save_type")}
            value={SAVED_COURSE_TYPES.PLANNED}
          />
        </div>

        <div className={s.radioInputWrapper}>
          <RadioInput
            label={t`Abandoned`}
            {...register("save_type")}
            value={SAVED_COURSE_TYPES.ABANDONED}
          />
        </div>

        <div className={s.actions}>
          {saveId && (
            <button
              type="button"
              onClick={onDelete}
              disabled={submitting}
              className={s.deleteBtn}
            >
              <Trans>Delete</Trans>
            </button>
          )}
          <button type="submit" disabled={submitting} className={s.saveBtn}>
            <Trans>Save</Trans>
          </button>
        </div>

        {error && (
          <p className={s.error}>
            <Trans>Unexpected error occured. Please try again later</Trans>
          </p>
        )}
      </form>
    </Menu>
  );
}

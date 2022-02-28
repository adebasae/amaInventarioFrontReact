import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  onChange: any;
  options: Array<Option>;
  title: string;
  selected: string;
  indexForm: number | null;
  onBlur: Function;
};

type Option = { name: string };

const DDl: FC<Props> = ({
  onChange,
  options,
  title,
  selected,
  indexForm,
  onBlur,
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(selected);

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const selectedId = e.currentTarget.value;
    setValue(selectedId);
    onChange(selectedId, indexForm);
  };
  return (
    <>
      <div className="revista__filtro">
        {/* {title !== '' ? <p>{t(title)}</p> : null} */}
        <div className="form-group select-wrapper">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="publicacion-anno" className="hidden">
            Año
          </label>
          <div className="form-control-block">
            <select
              className="form-control"
              id="publicacion-anno"
              value={value}
              placeholder={t(title)}
              onChange={(e) => handleChange(e)}
              onBlur={() => onBlur()}
            >
              {options &&
                options.map((y) => (
                  <option key={y.name} value={y.name}>
                    {y.name}
                  </option>
                ))}
            </select>
            <div className="icon icon-small">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6">
                <polygon
                  fillRule="evenodd"
                  points="5.833 7.5 10.325 12.5 15 7.5"
                  transform="translate(-5 -7)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DDl;

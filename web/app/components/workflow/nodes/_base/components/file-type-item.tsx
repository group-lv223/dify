'use client'
import type { FC } from 'react'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { SupportUploadFileTypes } from '../../../types'
import cn from '@/utils/classnames'
import { FILE_EXTS } from '@/app/components/base/prompt-editor/constants'
import TagInput from '@/app/components/base/tag-input'

type Props = {
  type: SupportUploadFileTypes.image | SupportUploadFileTypes.document | SupportUploadFileTypes.audio | SupportUploadFileTypes.video | SupportUploadFileTypes.custom
  selected: boolean
  onSelect: (type: SupportUploadFileTypes) => void
  onCustomFileTypesChange?: (customFileTypes: string[]) => void
  customFileTypes?: string[]
}

const FileTypeItem: FC<Props> = ({
  type,
  selected,
  onSelect,
  customFileTypes = [],
  onCustomFileTypesChange = () => { },
}) => {
  const { t } = useTranslation()

  const handleOnSelect = useCallback(() => {
    if (!selected)
      onSelect(type)
  }, [selected, onSelect, type])

  const isCustomSelected = type === SupportUploadFileTypes.custom && selected

  return (
    <div
      className={cn(
        'rounded-lg bg-components-option-card-option-bg border border-components-option-card-option-border',
        !isCustomSelected && 'py-2 px-3',
        selected && 'border-[1.5px] bg-components-option-card-option-selected-bg border-components-option-card-option-selected-border',
        !selected && 'cursor-pointer hover:bg-components-option-card-option-bg-hover hover:border-components-option-card-option-border-hover',
      )}
      onClick={handleOnSelect}
    >
      {isCustomSelected
        ? (
          <div>
            <div className='flex items-center p-3 pb-2 border-b border-divider-subtle'>
              <span className='shrink-0 w-4 h-4 bg-[#00B2EA]'></span>
              <div className='ml-2 text-text-primary system-sm-medium'>{t(`appDebug.variableConig.file.${type}.name`)}</div>
            </div>
            <div className='p-3'>
              <TagInput
                items={customFileTypes}
                onChange={onCustomFileTypesChange}
                placeholder={t('appDebug.variableConig.file.custom.createPlaceholder')!}
              />
            </div>
          </div>
        )
        : (
          <div className='flex items-center'>
            {/* TODO: Wait File type icon */}
            <span className='shrink-0 w-4 h-4 bg-[#00B2EA]'></span>
            <div className='ml-2'>
              <div className='text-text-primary system-sm-medium'>{t(`appDebug.variableConig.file.${type}.name`)}</div>
              <div className='mt-1 text-text-tertiary system-2xs-regular-uppercase'>{type !== SupportUploadFileTypes.custom ? FILE_EXTS[type].join(', ') : t('appDebug.variableConig.file.custom.description')}</div>
            </div>
          </div>
        )}

    </div>
  )
}

export default React.memo(FileTypeItem)

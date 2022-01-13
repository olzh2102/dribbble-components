import React from 'react'

import { baseTheme } from '../../styles/theme';
import { UploadImageIcon } from '../Icons';

import { StyledImageUploader } from './style';

const ImageUploader = ({ onImageUpload }: { onImageUpload: (e: any) => void }) => {
    return (
        <StyledImageUploader>
            <UploadImageIcon color={baseTheme.colors.font} />
            <input 
                className="input-image" 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={onImageUpload} 
            />
        </StyledImageUploader>
    )
}

export default ImageUploader
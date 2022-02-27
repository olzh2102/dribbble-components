import React from 'react'

import { UploadImageIcon } from '../Icons';
import { StyledImageUploader } from './style';

const ImageUploader = ({ onImageUpload, color }: { onImageUpload: (e: any) => void, color: string }) => {
    return (
        <StyledImageUploader>
            <UploadImageIcon color={color} />
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
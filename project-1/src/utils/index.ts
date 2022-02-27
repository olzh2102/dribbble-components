export const toHex = (color: string) => {
    const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
    return (
      `#${(
        (1 << 24) + 
        (parseInt(rgba[0]) << 16) + 
        (parseInt(rgba[1]) << 8) + 
        parseInt(rgba[2])
      ).toString(16).slice(1)}`
    );  
  }
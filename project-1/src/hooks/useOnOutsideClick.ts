import React, { useEffect } from 'react'

const useOnOutsideClick = (
    ref: any, 
    setOpen: (param: boolean) => void
) => {
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            const path = e.composedPath && e.composedPath()

            if (!path.includes(ref.current)) setOpen(false)
        }

        document.body.onclick = handleClick
    }, [ref, setOpen])
}

export default useOnOutsideClick
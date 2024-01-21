import React from "react"
import { Button, FixedLayout } from "@vkontakte/vkui"

const BottomButton = ({text, go, disabled = false}: {text: string, go: () => void, disabled?: boolean}) => {
    return <FixedLayout vertical="bottom" style={{ padding: 20 }}>
            <Button disabled={disabled} stretched={true} mode="primary" align="center" size="m" appearance="accent" onClick={() => go()}>{text}</Button>
    </FixedLayout>
};

export default BottomButton;
import { PageWrapper } from "./styles";
import Button from "components/Button/Button";
import Card from "components/Card/Card"
import User from "components/User/User"

function Advert() {

    return <PageWrapper>
        <PhotoWrapper>
        <Button name="<"/>
        <PhotoFrame>
        </PhotoFrame>
        <Button name=">"/>
        </PhotoWrapper>
        <DescriptionFrame>
            <ToolInfo>
                <Card />

            </ToolInfo>
            <UserInfo>
                <User />
                <Button name="Send message"/>
                <Button name="Show phone"/>
            </UserInfo>
        </DescriptionFrame>

    </PageWrapper>
}

export default Advert;
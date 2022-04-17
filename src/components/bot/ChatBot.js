import Helmet from "react-helmet";
import Layout from 'react-layout-components';
import { AuthUserContext, withAuthorization } from '../Session';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
const ChatBotComponent = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <ChatBotComponentPage authUser={authUser} />
            </div>
        )}
    </AuthUserContext.Consumer>
);
const useHubspotChat = props => {
    return (
        <Layout>
            <Helmet>
                <script type="text/javascript" id="hs-script-loader" async defer src="//js-na1.hs-scripts.com/20566110.js"></script>
            </Helmet>
        </Layout>
    );
}
const ChatBotComponentPage = withFirebase(useHubspotChat);
const condition = authUser => !!authUser;
export default compose(withAuthorization(condition))(ChatBotComponent)

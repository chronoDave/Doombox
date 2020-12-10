import { connect } from 'react-redux';
import { toArray } from '@doombox-utils';

const Route = ({ route, view, children }) => (toArray(view).includes(route) ? children : null);

const mapStateToProps = state => ({
  route: state.window.view
});

export default connect(
  mapStateToProps
)(Route);

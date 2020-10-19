import { connect } from 'react-redux';
import { toArray } from '@doombox-utils';

const Route = ({ route, view, children }) => (toArray(view).includes(route) ?
  children :
  null
);

const mapStateToProps = state => ({
  route: state.location.view
});

export default connect(
  mapStateToProps
)(Route);

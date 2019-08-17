import { makeStyles } from '@material-ui/core/styles';

export const useCollapseStyle = makeStyles(theme => ({
  expansionPanelRoot: {
    width: '100%',
    boxShadow: 'none',
    backgroundColor: 'initial',
    margin: '0 !important',
    '&::before': {
      display: 'none'
    }
  },
  expansionPanelSummaryRoot: {
    padding: theme.spacing(1),
    minHeight: 0,
    borderTop: theme.border(theme.palette.divider),
    borderBottom: theme.border(theme.palette.divider)
  },
  expansionPanelSummaryExpandIcon: {
    padding: 0,
    color: theme.palette.grey[50]
  },
  expansionPanelSummaryContent: {
    margin: 0
  },
  expansionPanelExpanded: {
    minHeight: '0 !important',
    '& div': {
      margin: '0 !important'
    }
  },
  expansionPanelDetails: {
    padding: 0
  }
}));

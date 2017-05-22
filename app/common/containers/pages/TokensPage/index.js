import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { format } from 'helpers/date';

import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';

import { getTokens } from 'reducers';
import { fetchTokens } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchTokens()),
})
@connect(state => ({
  tokens: getTokens(state, state.pages.TokensPage.tokens),
}))
export default class TokensPage extends React.Component {
  render() {
    const { tokens = [], t } = this.props;

    return (
      <div id="tokens-page">
        <H1>{ t('Tokens') }</H1>
        <div id="tokens-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('Id') },
              { key: 'name', title: t('Name') },
              { key: 'value', title: t('Value') },
              { key: 'scope', title: t('Expires_at') },
              { key: 'details', title: t('Action') },
            ]}
            data={tokens.map(item => ({
              id: item.id,
              name: <div className={styles.name}>
                {item.name}
              </div>,
              value: <div className={styles.name}>
                {item.value}
              </div>,
              scope: <div>
                { format(item.expires_at * 1000, 'DD.MM.YYYY HH:MM') }
              </div>,
              details: (<Button
                id={`token-details-button-${item.id}`}
                theme="link"
                to={`/tokens/${item.id}`}
              >
                { t('Show token details') }
              </Button>),
            }))}
          />
        </div>
        <div className={styles.block}>
          <Button to="/tokens/create">{t('Create new token')}</Button>
        </div>
      </div>
    );
  }
}
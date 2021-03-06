/* @flow */

import { InputTypeComposer } from 'graphql-compose';
import { getTypeName, getOrSetType, desc } from '../../../utils';
import { getCommonsScriptITC } from '../../Commons/Script';
import { getCommonsHdrITC } from '../../Commons/HDR';
import { getNumericFields } from '../../Commons/FieldNames';

export function getPercentilesITC(opts: mixed = {}): InputTypeComposer {
  const name = getTypeName('AggsPercentiles', opts);
  const description = desc(
    `
    A multi-value metrics aggregation that calculates one or more percentiles
    over numeric values extracted from the aggregated documents.
    These values can be extracted either from specific numeric fields
    in the documents, or be generated by a provided script.
    [Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-percentile-aggregation.html)
  `
  );

  return getOrSetType(name, () =>
    InputTypeComposer.create({
      name,
      description,
      fields: {
        field: getNumericFields(opts),
        percents: '[Float]',
        tdigest: `input ${getTypeName('AggsPercentilesTDigest', opts)} {
          compression: Int,
        }`,
        hdr: () => getCommonsHdrITC(opts),
        missing: 'Float',
        script: () => getCommonsScriptITC(opts),
      },
    })
  );
}

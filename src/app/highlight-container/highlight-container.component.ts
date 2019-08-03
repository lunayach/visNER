import {Component, OnInit} from '@angular/core';
import {NerService} from '../ner.service';

declare var $: any;


@Component({
  selector: 'app-highlight-container',
  styleUrls: ['highlight-container.component.css'],
  templateUrl: 'highlight-container.component.html'
})
export class HighlightContainerComponent implements OnInit {

  public queryText = '';
  private tagMap = {PER: 'person', ORG: 'organisation', LOC: 'location', MISC: 'miscellaneous'};

  constructor(private nerService: NerService) {
  }

  ngOnInit(): void {
    $(document).tooltip({classes: {'ui-tooltip': 'tooltip-bg', 'ui-tooltip-content': 'tooltip-bg'}});
  }

  public highlightEntities(startPositions: number[], endPositions: number[], scores: number[], tags: string[], inputText: string) {
    const starts = startPositions;
    const ends = endPositions;
    const that = this;

    let positions = [];
    const normalizedPositions = [];
    starts.forEach((position) => {
      positions.push({position, value: 1});
    });
    ends.forEach((position) => {
      positions.push({position, value: -1});
    });
    positions = positions.sort((a, b) => a.position - b.position ||
      b.value - a.value);
    const currentSection = {from: 0, counter: 0};
    for (const position of positions) {
      if (!currentSection.counter) {
        if (position.value === -1) {
          throw new Error(`inconsistent boundaries: closing before opening ${position.position}`);
        }
        currentSection.from = position.position;
      }
      currentSection.counter += position.value;

      if (!currentSection.counter) {
        normalizedPositions.push({
          from: currentSection.from,
          to: position.position
        });
      }
    }
    if (currentSection.counter) {
      throw new Error('last section has not been closed properly');
    }

    const sourceText = inputText;

    const documentFragment = document.createDocumentFragment();
    let withoutHighlightingStart = 0;
    normalizedPositions.forEach((highlightRange, index) => {
      if (highlightRange.from > withoutHighlightingStart) {
        const notHighlighted = createTextNode(sourceText.slice(withoutHighlightingStart, highlightRange.from));
        documentFragment.appendChild(notHighlighted);
      }
      const highlighted = createHighlighted(sourceText.slice(highlightRange.from, highlightRange.to), tags[index], scores[index]);
      documentFragment.appendChild(highlighted);
      withoutHighlightingStart = highlightRange.to;
    });
    const lastNotHighlighted = createTextNode(sourceText.slice(withoutHighlightingStart));
    documentFragment.appendChild(lastNotHighlighted);
    console.log(documentFragment);
    return documentFragment;

    function createTextNode(str) {
      return document.createTextNode(str);
    }

    function createHighlighted(str, tag: string, score: number) {
      const span = document.createElement('span');
      const tagClass = that.tagClass(tag);
      span.classList.add(tagClass, 'highlighted');
      span.appendChild(createTextNode(str));
      span.setAttribute('title', 'score: ' + score.toString());
      return span;
    }

  }

  public manageHighlight() {
    // tslint:disable-next-line:variable-name one-variable-per-declaration
    let entities, start_positions, end_positions, scores, tags;
    this.nerService.getTags(this.queryText).subscribe((data) => {
      // @ts-ignore
      entities = data.entities;
      // @ts-ignore
      start_positions = data.start_positions;
      // @ts-ignore
      end_positions = data.end_positions;
      // @ts-ignore
      scores = data.scores;
      // @ts-ignore
      tags = data.tags;
      const inputID = 'output-text';
      const documentFragment = this.highlightEntities(start_positions, end_positions, scores, tags, this.queryText);
      const outputComponent = document.getElementById(inputID);
      outputComponent.innerHTML = '';
      outputComponent.appendChild(documentFragment);
    });
  }

  private tagClass(tag: string) {
    return this.tagMap[tag];
  }
}

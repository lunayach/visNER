from flask import abort, Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flair.data import Sentence
from flair.models import SequenceTagger
import re
import argparse


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

tagger = SequenceTagger.load('ner')


@app.route('/api/NER', methods=['POST'])
@cross_origin()
def extract_entities():
    if not request.json or 'message' not in request.json:
        abort(400)
    query = request.json['message']
    sentence = Sentence(query, use_tokenizer=True)
    tagger.predict(sentence)

    entities = []
    tags = []
    scores = []
    start_positions = []
    end_positions = []

    for i, en in enumerate(sentence.get_spans('ner')):
        entities.append([str(token.text) for token in en.tokens])
        tags.append(en.tag)
        scores.append(str(round(en.score, 2)))
        start_positions.append(int(en.start_pos))
        end_positions.append(int(en.end_pos))

    response = {'entities': entities, 'tags': tags, 'scores': scores, 'start_positions': start_positions,
                'end_positions': end_positions}
    return jsonify(response), 200


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port",
                        default=8500,
                        type=int,
                        help="Port to be used for the Flask Application.")
    args = parser.parse_args()
    app.run(host="0.0.0.0", port=int(args.port))

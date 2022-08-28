from crypt import methods
from flask import Flask, request as req, jsonify
from flask_cors import CORS
import requests
import json

from invokes import invoke_http

app = Flask(__name__)
CORS(app)

api = '861Yy9EAavDAAov36fheX5YLScXsBYWy'
# ticker = 'AAPL'
limit = '70'
start_date = '2021-07-22'
end_date = '2021-08-22'

# ROUTE LINK: http://10.124.11.45:3001/getStocks/<TICKER>
@app.route('/getStocks/<string:ticker>', methods=['GET'])
def getStocks(ticker):
    # Default date range of a month just for proof of concept
    # We can use the highest price paid for that period for projections into a graph
    apiURL = f'https://api.polygon.io/v2/aggs/ticker/{ticker}/range/1/day/{start_date}/{end_date}?adjusted=true&sort=asc&limit=120&apiKey={api}'

    try:
        urlRes = invoke_http(apiURL)

        return jsonify({
            'code':200, 
            'message': 'API call successfull. Stock data returned', 
            'start_date': start_date,
            'end_date': end_date,
            'highestPrices':highest_price_only(urlRes['results'])
        })

    except Exception as e:
        return jsonify({
            'code':'500', 
            'message':f'API call failed. ERROR: {e}', 
        })

def highest_price_only(stockData):
    return [i['vw'] for i in stockData]


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=3001, debug=True)
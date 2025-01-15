"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { TypeAnimation } from 'react-type-animation'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type ModelId = 'alphanet' | 'lexnet' | 'ishaaranet';

const modelData = {
  alphanet: {
    name: "Alphanet",
    accuracy: "95%",
    precision: "93%",
    recall: "94%",
  },
  lexnet: {
    name: "Lexnet",
    precision: "99.8%",
    recall: "98.7%",
    mAp50: "99%",
    "mAp50-95": "88.9%",
  },
  ishaaranet: {
    name: "Ishaara Net",
    accuracy: "94%",
    precision: "92%",
    recall: "93%",
  },
} as const;

const lexnetGraphData = {
  "epoch":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72],
  "train/box_loss":[0.90382,0.76439,0.81018,0.79941,0.73694,0.69595,0.66908,0.65201,0.63282,0.62087,0.60992,0.60503,0.59891,0.59063,0.58559,0.57682,0.57349,0.56771,0.56887,0.56378,0.56051,0.55823,0.55869,0.55417,0.55557,0.55092,0.54624,0.54394,0.53348,0.53759,0.54206,0.53945,0.53753,0.53672,0.53175,0.53176,0.52599,0.5253,0.52574,0.52429,0.52425,0.52465,0.5246,0.52621,0.52545,0.52134,0.5178,0.51924,0.51735,0.51537,0.51506,0.51319,0.5128,0.51364,0.51049,0.49165,0.49749,0.50199,0.50184,0.49946,0.50141,0.49775,0.49857,0.49582,0.49524,0.49551,0.49308,0.49414,0.49473,0.49187,0.4955,0.49471],
  "train/cls_loss":[1.10381,0.48602,0.52386,0.49971,0.42955,0.39004,0.37141,0.35542,0.34082,0.32817,0.32424,0.31742,0.31108,0.30566,0.30045,0.29536,0.29465,0.29194,0.29095,0.28901,0.28719,0.28523,0.2837,0.27992,0.27985,0.27685,0.273,0.27326,0.26469,0.27258,0.27327,0.27176,0.26964,0.26813,0.26577,0.2661,0.26446,0.2636,0.26403,0.26327,0.26123,0.26302,0.26225,0.25987,0.25981,0.25919,0.25839,0.25549,0.25565,0.25644,0.25318,0.25556,0.25358,0.2538,0.25165,0.23691,0.24418,0.24637,0.24498,0.24407,0.24462,0.24336,0.24377,0.24387,0.24287,0.24484,0.24089,0.2437,0.2435,0.23855,0.24035,0.23825],
  "metrics/mAP50(B)":[0.98483,0.9852,0.98466,0.98431,0.98565,0.98759,0.9863,0.98763,0.98837,0.98667,0.98766,0.98855,0.98753,0.98844,0.98912,0.98945,0.9901,0.98991,0.98981,0.98959,0.98979,0.98981,0.99001,0.98993,0.99005,0.99009,0.99009,0.99039,0.99007,0.98994,0.99002,0.99002,0.98997,0.99,0.99026,0.99022,0.99037,0.99045,0.99041,0.99021,0.9903,0.99037,0.99053,0.99051,0.99056,0.99059,0.9906,0.9906,0.99064,0.9907,0.99075,0.99076,0.9908,0.99079,0.99061,0.99061,0.99077,0.99075,0.99076,0.99077,0.99079,0.99057,0.99072,0.99069,0.99074,0.99086,0.99082,0.99082,0.99079,0.99081,0.99088,0.99092],
  "metrics/mAP50-95(B)":[0.77313,0.79323,0.79925,0.79239,0.82878,0.83881,0.85131,0.85341,0.85507,0.85607,0.86244,0.86279,0.86277,0.86455,0.86824,0.87025,0.86887,0.87075,0.87403,0.87233,0.87465,0.87408,0.8756,0.8744,0.87472,0.87448,0.87413,0.87495,0.87507,0.87502,0.87535,0.87475,0.87519,0.87691,0.87731,0.87756,0.87615,0.87737,0.87717,0.87752,0.87657,0.87769,0.87875,0.87805,0.87867,0.87749,0.879,0.87773,0.8788,0.87967,0.8817,0.8794,0.88108,0.87988,0.87995,0.88063,0.8826,0.8823,0.88086,0.88069,0.88103,0.8808,0.88063,0.88115,0.88174,0.87996,0.88162,0.88078,0.88229,0.88078,0.88278,0.88115],
  "val/box_loss":[0.89316,0.82898,0.78137,0.80813,0.72883,0.69848,0.68588,0.67063,0.66556,0.65937,0.64535,0.64731,0.64004,0.63005,0.62769,0.62501,0.62712,0.62451,0.62112,0.6187,0.61806,0.61721,0.6162,0.61498,0.61434,0.61374,0.61347,0.61325,0.61256,0.61221,0.61196,0.61175,0.61148,0.6109,0.61043,0.60981,0.60933,0.60913,0.60826,0.60791,0.60776,0.60742,0.60754,0.6074,0.60707,0.60717,0.60708,0.60642,0.60603,0.60588,0.60526,0.60442,0.60358,0.60316,0.6028,0.60244,0.60126,0.60126,0.60137,0.60082,0.60007,0.59953,0.59911,0.5989,0.59859,0.59836,0.59781,0.59827,0.59823,0.59826,0.5976,0.59711],
  "val/cls_loss":[0.35681,0.35144,0.36324,0.32829,0.31011,0.28136,0.27317,0.25517,0.25482,0.25303,0.24202,0.23987,0.2364,0.2327,0.22632,0.22685,0.23263,0.22832,0.22795,0.22078,0.22088,0.22006,0.21794,0.21719,0.21754,0.21716,0.21691,0.21619,0.21589,0.21576,0.21582,0.21548,0.21514,0.21468,0.21431,0.21368,0.21317,0.21357,0.21354,0.21326,0.21294,0.21237,0.21174,0.21241,0.21179,0.21134,0.21115,0.21099,0.21099,0.21072,0.21086,0.21092,0.21008,0.21018,0.21031,0.20987,0.20988,0.2096,0.20959,0.20856,0.20806,0.20795,0.20755,0.207,0.20663,0.20615,0.20601,0.20537,0.20501,0.20528,0.2051,0.20433]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Model Performance',
    },
  },
};

const createChartData = (label1: string, data1: number[], label2: string, data2: number[]) => ({
  labels: lexnetGraphData.epoch,
  datasets: [
    {
      label: label1,
      data: data1,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: label2,
      data: data2,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
});

export default function ModelDetails() {
  const params = useParams();
  const { modelId } = params as { modelId: ModelId };
  const modelInfo = modelData[modelId] || {
    name: 'Unknown Model',
    precision: 'N/A',
    recall: 'N/A',
    mAp50: 'N/A',
    "mAp50-95": 'N/A',
  };

  const boxLossData = createChartData('Train Box Loss', lexnetGraphData["train/box_loss"], 'Val Box Loss', lexnetGraphData["val/box_loss"]);
  const clsLossData = createChartData('Train Cls Loss', lexnetGraphData["train/cls_loss"], 'Val Cls Loss', lexnetGraphData["val/cls_loss"]);
  const mAPData = createChartData('mAP50', lexnetGraphData["metrics/mAP50(B)"], 'mAP50-95', lexnetGraphData["metrics/mAP50-95(B)"]);

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8">{modelInfo.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {Object.entries(modelInfo).map(([key, value]) => (
          key !== 'name' && (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg capitalize">{key}</CardTitle>
                </CardHeader>
                <CardContent>
                  <TypeAnimation
                    sequence={[value]}
                    wrapper="p"
                    cursor={false}
                    repeat={0}
                    style={{ fontSize: '2rem', fontWeight: 'bold' }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Box Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <Line options={options} data={boxLossData} />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Classification Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <Line options={options} data={clsLossData} />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>mAP Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <Line options={options} data={mAPData} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


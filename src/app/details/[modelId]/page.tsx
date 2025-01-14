"use client"
import React from 'react'
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
import { useParams } from 'next/navigation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
}

const generateDummyData = () => ({
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Accuracy',
      data: Array.from({length: 6}, () => Math.random() * 100),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
})

type ModelId = 'alphanet' | 'lexnet' | 'ishaaranet';

// type PageProps = {
//   params: {
//     modelId: ModelId;
//   };
// };

const modelData = {
  alphanet: {
    name: "Alphanet",
    accuracy: "95%",
    precision: "93%",
    recall: "94%",
    description: "Specialized in alphabet recognition with state-of-the-art accuracy.",
  },
  lexnet: {
    name: "Lexnet",
    accuracy: "92%",
    precision: "90%",
    recall: "91%",
    description: "Advanced word recognition system with contextual understanding.",
  },
  ishaaranet: {
    name: "Ishaara Net",
    accuracy: "94%",
    precision: "92%",
    recall: "93%",
    description: "Comprehensive solution combining alphabet and word recognition.",
  },
} as const;


export default function ModelDetails() {
  const params = useParams();
  const { modelId } = params as { modelId: ModelId };
  const resolvedParams = { modelId };
  const modelInfo = modelData[resolvedParams.modelId] || {
    name: 'Unknown Model',
    accuracy: 'N/A',
    precision: 'N/A',
    recall: 'N/A',
    description: 'Information not available for this model.',
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8">{modelInfo.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Model Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-2xl font-bold">{modelInfo.accuracy}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Precision</p>
                <p className="text-2xl font-bold">{modelInfo.precision}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Recall</p>
                <p className="text-2xl font-bold">{modelInfo.recall}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{modelInfo.description}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Training Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Line options={options} data={generateDummyData()} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Validation Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <Line options={options} data={generateDummyData()} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loss Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <Line options={options} data={generateDummyData()} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
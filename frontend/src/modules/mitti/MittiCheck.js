import React, { useState } from 'react';
import { TestTube, Upload, Camera, Leaf, Droplets, BarChart3, Calendar } from 'lucide-react';

const MittiCheck = () => {
  const [selectedSoilType, setSelectedSoilType] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const soilTypes = [
    {
      id: 'clay',
      name: 'Clay Soil (चिकनी मिट्टी)',
      description: 'Heavy soil with good water retention but poor drainage',
      characteristics: ['High water retention', 'Poor drainage', 'Rich in nutrients', 'Hard when dry'],
      color: 'bg-yellow-600'
    },
    {
      id: 'sandy',
      name: 'Sandy Soil (रेतीली मिट्टी)',
      description: 'Light soil with good drainage but low water retention',
      characteristics: ['Good drainage', 'Low water retention', 'Easy to work', 'Low nutrient retention'],
      color: 'bg-yellow-400'
    },
    {
      id: 'loamy',
      name: 'Loamy Soil (दोमट मिट्टी)',
      description: 'Ideal soil with balanced properties',
      characteristics: ['Balanced drainage', 'Good water retention', 'Rich in nutrients', 'Easy to work'],
      color: 'bg-amber-700'
    },
    {
      id: 'black',
      name: 'Black Soil (काली मिट्टी)',
      description: 'Cotton soil with high clay content',
      characteristics: ['High clay content', 'Rich in lime', 'Good for cotton', 'Swells when wet'],
      color: 'bg-gray-800'
    }
  ];

  const cropRecommendations = {
    clay: [
      {
        name: 'Rice (धान)',
        suitability: 95,
        season: 'Kharif (June-October)',
        yield: '4-6 tons per hectare',
        tips: ['Maintain water level 2-5 cm', 'Apply nitrogen in 3 splits', 'Control weeds early']
      },
      {
        name: 'Wheat (गेहूं)',
        suitability: 85,
        season: 'Rabi (November-April)',
        yield: '3-5 tons per hectare',
        tips: ['Sow in November', 'Apply phosphorus at sowing', 'Irrigate at critical stages']
      }
    ],
    sandy: [
      {
        name: 'Groundnut (मूंगफली)',
        suitability: 90,
        season: 'Kharif (June-October)',
        yield: '2-3 tons per hectare',
        tips: ['Ensure good drainage', 'Apply gypsum for pods', 'Control leaf spot diseases']
      },
      {
        name: 'Millet (बाजरा)',
        suitability: 85,
        season: 'Kharif (June-September)',
        yield: '1-2 tons per hectare',
        tips: ['Drought tolerant crop', 'Minimal water requirement', 'Good for arid regions']
      }
    ],
    loamy: [
      {
        name: 'Tomato (टमाटर)',
        suitability: 95,
        season: 'Year-round with protection',
        yield: '40-60 tons per hectare',
        tips: ['Provide plant support', 'Regular watering', 'Control pests regularly']
      },
      {
        name: 'Potato (आलू)',
        suitability: 90,
        season: 'Rabi (October-February)',
        yield: '20-30 tons per hectare',
        tips: ['Plant in ridges', 'Earthing up important', 'Harvest when mature']
      }
    ],
    black: [
      {
        name: 'Cotton (कपास)',
        suitability: 95,
        season: 'Kharif (May-October)',
        yield: '15-20 quintals per hectare',
        tips: ['Deep plowing needed', 'Good for cotton cultivation', 'Monitor bollworm']
      },
      {
        name: 'Soybean (सोयाबीन)',
        suitability: 85,
        season: 'Kharif (June-October)',
        yield: '10-15 quintals per hectare',
        tips: ['Inoculate seeds', 'Ensure proper drainage', 'Control pod borer']
      }
    ]
  };

  const fertilizerRecommendations = {
    clay: [
      {
        type: 'Organic Compost',
        quantity: '3-5 tons per hectare',
        timing: 'Before monsoon',
        method: 'Mix with soil'
      },
      {
        type: 'Gypsum',
        quantity: '500 kg per hectare',
        timing: 'Before plowing',
        method: 'Broadcast'
      }
    ],
    sandy: [
      {
        type: 'Organic Compost',
        quantity: '5-10 tons per hectare',
        timing: 'Before sowing',
        method: 'Mix with soil'
      },
      {
        type: 'NPK (10:26:26)',
        quantity: '200-300 kg per hectare',
        timing: 'At sowing',
        method: 'Broadcast and incorporate'
      }
    ],
    loamy: [
      {
        type: 'Balanced NPK',
        quantity: 'As per soil test',
        timing: 'Split application',
        method: 'Based on crop requirement'
      }
    ],
    black: [
      {
        type: 'Phosphorus',
        quantity: '40-60 kg per hectare',
        timing: 'At sowing',
        method: 'Drill application'
      },
      {
        type: 'Zinc Sulphate',
        quantity: '25 kg per hectare',
        timing: 'Before sowing',
        method: 'Broadcast'
      }
    ]
  };

  const handleSoilAnalysis = () => {
    if (!selectedSoilType) return;

    const soilInfo = soilTypes.find(soil => soil.id === selectedSoilType);
    const crops = cropRecommendations[selectedSoilType] || [];
    const fertilizers = fertilizerRecommendations[selectedSoilType] || [];

    setAnalysisResult({
      soilType: soilInfo,
      crops,
      fertilizers,
      generalTips: [
        'Get soil tested every 2-3 years',
        'Maintain soil organic matter',
        'Practice crop rotation',
        'Use appropriate irrigation methods'
      ]
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        // Mock image analysis
        setTimeout(() => {
          setAnalysisResult({
            soilType: { name: 'Loamy Soil (Detected)', description: 'AI detected loamy soil from image' },
            confidence: 85,
            crops: cropRecommendations.loamy,
            fertilizers: fertilizerRecommendations.loamy,
            imageAnalysis: {
              color: 'Dark brown',
              texture: 'Medium',
              moisture: 'Moderate',
              organicContent: 'Good'
            }
          });
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
              <TestTube className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            MittiCheck
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Soil health guidance and crop recommendations for better farming
          </p>
          <p className="text-sm text-gray-500 mt-2">
            मिट्टी की जांच करें और बेहतर फसल की सलाह पाएं
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Soil Analysis Input */}
          <div className="space-y-6">
            {/* Manual Soil Type Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Leaf className="mr-2 text-green-600" size={20} />
                Select Soil Type
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {soilTypes.map((soil) => (
                  <button
                    key={soil.id}
                    onClick={() => setSelectedSoilType(soil.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      selectedSoilType === soil.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <div className={`w-4 h-4 ${soil.color} rounded-full mr-3`}></div>
                      <h3 className="font-semibold">{soil.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{soil.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {soil.characteristics.slice(0, 2).map((char, index) => (
                        <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {char}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={handleSoilAnalysis}
                disabled={!selectedSoilType}
                className="w-full mt-4 bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Analyze Soil
              </button>
            </div>

            {/* Image Upload */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Camera className="mr-2 text-blue-600" size={20} />
                Upload Soil Image
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {uploadedImage ? (
                  <div>
                    <img
                      src={uploadedImage}
                      alt="Uploaded soil"
                      className="max-w-full h-32 object-cover mx-auto rounded-lg mb-4"
                    />
                    <p className="text-sm text-gray-600">Analyzing image...</p>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-600 mb-2">Upload a photo of your soil</p>
                    <p className="text-sm text-gray-500 mb-4">
                      AI will analyze the soil type from the image
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="soil-image"
                />
                <label
                  htmlFor="soil-image"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  Choose Image
                </label>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            {analysisResult ? (
              <>
                {/* Soil Information */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <BarChart3 className="mr-2 text-orange-600" size={20} />
                    Analysis Results
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-orange-700">
                        {analysisResult.soilType.name}
                      </h3>
                      <p className="text-gray-600">{analysisResult.soilType.description}</p>
                      {analysisResult.confidence && (
                        <p className="text-sm text-green-600 mt-1">
                          Confidence: {analysisResult.confidence}%
                        </p>
                      )}
                    </div>

                    {analysisResult.imageAnalysis && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Image Analysis:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Color: {analysisResult.imageAnalysis.color}</div>
                          <div>Texture: {analysisResult.imageAnalysis.texture}</div>
                          <div>Moisture: {analysisResult.imageAnalysis.moisture}</div>
                          <div>Organic Content: {analysisResult.imageAnalysis.organicContent}</div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="font-medium mb-2">General Tips:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {analysisResult.generalTips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Crop Recommendations */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Leaf className="mr-2 text-green-600" size={20} />
                    Recommended Crops
                  </h2>
                  <div className="space-y-4">
                    {analysisResult.crops.map((crop, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{crop.name}</h3>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                            {crop.suitability}% suitable
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          <Calendar className="inline mr-1" size={14} />
                          {crop.season}
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          Expected yield: {crop.yield}
                        </div>
                        <div className="text-sm">
                          <strong>Care Tips:</strong>
                          <ul className="list-disc list-inside mt-1 text-gray-600">
                            {crop.tips.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fertilizer Recommendations */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Droplets className="mr-2 text-blue-600" size={20} />
                    Fertilizer Recommendations
                  </h2>
                  <div className="space-y-4">
                    {analysisResult.fertilizers.map((fertilizer, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold mb-2">{fertilizer.type}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <strong>Quantity:</strong>
                            <br />
                            {fertilizer.quantity}
                          </div>
                          <div>
                            <strong>Timing:</strong>
                            <br />
                            {fertilizer.timing}
                          </div>
                          <div>
                            <strong>Method:</strong>
                            <br />
                            {fertilizer.method}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center py-12">
                  <TestTube className="mx-auto text-gray-400 mb-4" size={64} />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Ready for Analysis
                  </h3>
                  <p className="text-gray-600">
                    Select your soil type or upload an image to get personalized recommendations
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Crop Calendar */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 text-purple-600" size={20} />
            Seasonal Crop Calendar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-semibold mb-2">Kharif Season</h3>
              <p className="text-sm text-gray-600 mb-2">June - October</p>
              <p className="text-xs text-gray-500">Rice, Cotton, Sugarcane, Maize</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌾</span>
              </div>
              <h3 className="font-semibold mb-2">Rabi Season</h3>
              <p className="text-sm text-gray-600 mb-2">November - April</p>
              <p className="text-xs text-gray-500">Wheat, Barley, Peas, Gram</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🥕</span>
              </div>
              <h3 className="font-semibold mb-2">Zaid Season</h3>
              <p className="text-sm text-gray-600 mb-2">March - June</p>
              <p className="text-xs text-gray-500">Watermelon, Cucumber, Fodder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MittiCheck;

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ShotAdvice } from '../types';

interface FieldViewProps {
  advice: ShotAdvice | null;
  loading: boolean;
}

const FieldView: React.FC<FieldViewProps> = ({ advice, loading }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400;
    const height = 400;
    const center = { x: width / 2, y: height / 2 };
    const radius = 180;
    const pitchWidth = 20;
    const pitchHeight = 60;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    // 1. Draw Field (Grass)
    svg.append("circle")
      .attr("cx", center.x)
      .attr("cy", center.y)
      .attr("r", radius)
      .attr("fill", "#10b981") // emerald-500
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2);

    // 2. Draw 30-yard circle (Fielding restriction)
    svg.append("circle")
      .attr("cx", center.x)
      .attr("cy", center.y)
      .attr("r", radius * 0.6)
      .attr("fill", "none")
      .attr("stroke", "rgba(255,255,255,0.5)")
      .attr("stroke-dasharray", "4 4")
      .attr("stroke-width", 1);

    // 3. Draw Pitch
    svg.append("rect")
      .attr("x", center.x - pitchWidth / 2)
      .attr("y", center.y - pitchHeight / 2)
      .attr("width", pitchWidth)
      .attr("height", pitchHeight)
      .attr("fill", "#eab308") // yellow-500 (soil color)
      .attr("rx", 2);

    // 4. Stumps (Visual cue)
    // Bowler end
    svg.append("line")
      .attr("x1", center.x - 5).attr("y1", center.y - pitchHeight / 2 + 2)
      .attr("x2", center.x + 5).attr("y2", center.y - pitchHeight / 2 + 2)
      .attr("stroke", "#000").attr("stroke-width", 2);
    // Batsman end
    svg.append("line")
      .attr("x1", center.x - 5).attr("y1", center.y + pitchHeight / 2 - 2)
      .attr("x2", center.x + 5).attr("y2", center.y + pitchHeight / 2 - 2)
      .attr("stroke", "#000").attr("stroke-width", 2);

    // Batsman Position Marker
    svg.append("circle")
      .attr("cx", center.x + 4) // Slightly to leg side for RHB
      .attr("cy", center.y + pitchHeight / 2 - 5)
      .attr("r", 3)
      .attr("fill", "#000000");

    // 5. Draw Shot Visualization if advice exists
    if (advice && !loading) {
      const angleRad = (advice.placementAngle - 90) * (Math.PI / 180); // Adjusting because SVG 0 is right (3 o'clock), but our Logic 0 is up (12 o'clock)
      
      const startX = center.x;
      const startY = center.y + pitchHeight / 2 - 10; // Hit from crease
      
      const endX = startX + Math.cos(angleRad) * (radius - 20);
      const endY = startY + Math.sin(angleRad) * (radius - 20);

      // Shot Line
      const shotPath = svg.append("line")
        .attr("x1", startX)
        .attr("y1", startY)
        .attr("x2", startX) // Animate from start
        .attr("y2", startY) // Animate from start
        .attr("stroke", "#fbbf24") // amber-400
        .attr("stroke-width", 4)
        .attr("marker-end", "url(#arrowhead)");

      // Animate line
      shotPath.transition()
        .duration(1000)
        .ease(d3.easeCubicOut)
        .attr("x2", endX)
        .attr("y2", endY);
      
      // Target Area Highlight
      svg.append("circle")
        .attr("cx", endX)
        .attr("cy", endY)
        .attr("r", 0)
        .attr("fill", "rgba(251, 191, 36, 0.5)")
        .attr("stroke", "#fbbf24")
        .transition()
        .delay(1000)
        .duration(500)
        .attr("r", 15);

      // Label
      svg.append("text")
        .attr("x", endX)
        .attr("y", endY - 20)
        .attr("text-anchor", "middle")
        .attr("fill", "#ffffff")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("style", "text-shadow: 1px 1px 2px rgba(0,0,0,0.8);")
        .text(advice.fieldingRegion)
        .attr("opacity", 0)
        .transition()
        .delay(1200)
        .duration(500)
        .attr("opacity", 1);
    }

    // Define Arrowhead marker
    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#fbbf24");

  }, [advice, loading]);

  return (
    <div className="flex justify-center items-center w-full h-full bg-emerald-800/10 rounded-full p-4">
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="w-full max-w-[400px] h-auto drop-shadow-xl"
        style={{ overflow: 'visible' }}
      ></svg>
    </div>
  );
};

export default FieldView;

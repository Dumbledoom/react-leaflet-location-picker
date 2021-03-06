import React from "react";
import { LatLngTuple } from "leaflet";
import { Circle, PointSeries, Rectangle } from "./LocationPicker";
import Tag from "./Tag";
import {
  stringifyPoint,
  stringifyCircle,
  stringifyRectangle,
  stringifyPointSeries
} from "./utils";

export interface IBannerProps {
  points?: LatLngTuple[];
  pointRemoval?: (point: LatLngTuple) => void;
  circles?: Circle[];
  circleRemoval?: (circle: Circle) => void;
  rectangles?: Rectangle[];
  rectangleRemoval?: (rectangle: Rectangle) => void;
  polylines?: PointSeries[];
  polylineRemoval?: (polyline: PointSeries) => void;
  polygons?: PointSeries[];
  polygonRemoval?: (polygon: PointSeries) => void;
}

const Banner: React.FC<IBannerProps> = props => {
  return (
    <>
      {renderPointsBanner(props)}
      {renderCirclesBanner(props)}
      {renderRectanglesBanner(props)}
      {renderPolylinesBanner(props)}
      {renderPolygonsBanner(props)}
    </>
  );
};

const renderPointsBanner = (props: IBannerProps) => {
  const { points, pointRemoval } = props;
  if (!points) return null;
  const onRemove = pointRemoval
    ? (removePoint: LatLngTuple) => () => {
        pointRemoval(removePoint);
      }
    : () => undefined;
  const pointTags: JSX.Element[] = points.map((point, i) => {
    return generateTag(stringifyPoint(point), i, onRemove(point));
  });
  return constructBanner("Points", pointTags);
};
const renderCirclesBanner = (props: IBannerProps) => {
  const { circles, circleRemoval } = props;
  if (!circles) return null;
  const onRemove = circleRemoval
    ? (removeCircle: Circle) => () => {
        circleRemoval(removeCircle);
      }
    : () => undefined;
  const circleTags: JSX.Element[] = circles.map((circle, i) => {
    return generateTag(stringifyCircle(circle), i, onRemove(circle));
  });
  return constructBanner("Circles", circleTags);
};
const renderRectanglesBanner = (props: IBannerProps) => {
  const { rectangles, rectangleRemoval } = props;
  if (!rectangles) return null;
  const onRemove = rectangleRemoval
    ? (removeRectangle: Rectangle) => () => {
        rectangleRemoval(removeRectangle);
      }
    : () => undefined;
  const rectangleTags: JSX.Element[] = rectangles.map((rectangle, i) => {
    return generateTag(stringifyRectangle(rectangle), i, onRemove(rectangle));
  });

  return constructBanner("Rectangles", rectangleTags);
};
const renderPolylinesBanner = (props: IBannerProps) => {
  const { polylines, polylineRemoval } = props;
  if (!polylines) return null;
  const onRemove = polylineRemoval
    ? (removePolyline: PointSeries) => () => {
        polylineRemoval(removePolyline);
      }
    : () => undefined;
  const polylineTags: JSX.Element[] = polylines.map((polyline, i) => {
    return generateTag(stringifyPointSeries(polyline), i, onRemove(polyline));
  });
  return constructBanner("Lines", polylineTags);
};
const renderPolygonsBanner = (props: IBannerProps) => {
  const { polygons, polygonRemoval } = props;
  if (!polygons) return null;
  const onRemove = polygonRemoval
    ? (removePolygon: PointSeries) => () => {
        polygonRemoval(removePolygon);
      }
    : () => undefined;
  const polygonTags: JSX.Element[] = polygons.map((polygon, i) => {
    return generateTag(stringifyPointSeries(polygon), i, onRemove(polygon));
  });
  return constructBanner("Polygons", polygonTags);
};

const generateTag = (
  value: string,
  i: number,
  onRemove?: () => void
): JSX.Element => {
  return <Tag content={value} onRemove={onRemove} key={value + i} />;
};

const constructBanner = (
  bannerName: string,
  tags: JSX.Element[]
): JSX.Element => {
  return (
    <div className="flex-container flex-wrap some-margin">
      <h3 className="text no-margin">{bannerName}: </h3>
      {tags}
    </div>
  );
};

export default Banner;
